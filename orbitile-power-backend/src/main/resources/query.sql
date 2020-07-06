CREATE SEQUENCE powerline_seq START 1;
CREATE SEQUENCE alert_seq START 1;
CREATE SEQUENCE order_seq START 1;
CREATE SEQUENCE order_nr_seq START 100;
CREATE SEQUENCE order_powerline_seq START 1;

CREATE TYPE VOLTAGE AS ENUM ('HIGH', 'MEDIUM', 'LOW');
CREATE TYPE WIRE_TYPE AS ENUM ('TRIANGLE', 'FLAT', 'PRZEPLOT', 'NO_DATA');
CREATE TYPE ALERT_CATEGORY AS ENUM ('INTERNAL');
CREATE TYPE ORDER_STATUS AS ENUM ('NEW', 'ACTIVE','CLOSED');

CREATE TYPE ALERT_STATUS AS ENUM ('ACTIVE', 'INACTIVE');

CREATE TABLE powerline (
 id INTEGER PRIMARY KEY DEFAULT nextval('powerline_seq'),
 code TEXT UNIQUE NOT NULL,
 fullName TEXT NOT NULL,
 voltage VOLTAGE NOT NUll
);

CREATE TABLE powerlinepart (
 idpowerline INTEGER REFERENCES powerline(id),
 idobject INTEGER,
 span TEXT,
 wireType WIRE_TYPE,
 geom GEOMETRY(MultilineStringZM, 4326)
);

CREATE TABLE powerlinebuffer (
 idpowerline INTEGER REFERENCES powerline(id),
 geom GEOMETRY(MultilineStringZM, 4326)
);


CREATE TABLE alert (
 id INTEGER PRIMARY KEY DEFAULT nextval('alert_seq'),
 idpowerline INTEGER REFERENCES powerline(id),
 createdtime date,
 area numeric,
 category ALERT_CATEGORY,
 geom GEOMETRY(MultiPolygon, 4326)
);


CREATE TABLE buffer (
    idpowerline INTEGER REFERENCES powerline(id),
    geom GEOMETRY(MultiPolygon, 4326)
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY DEFAULT nextval('order_seq'),
    createdtime date,
    closedtime date,
    nr TEXT DEFAULT 'Z00' || nextval('order_nr_seq'),
    owner TEXT,
    area numeric,
    status ORDER_STATUS
);

create table orderpowerline (
    id INTEGER PRIMARY KEY DEFAULT nextval('order_powerline_seq'),
    idpowerline INTEGER REFERENCES powerline(id),
    idorder INTEGER REFERENCES orders(id)
);


INSERT INTO powerline(code, fullName, voltage) values
('LUB-KOC','Lubartów-Kock', 'HIGH'),
('SIT-WOR','Sitnicka-Woroniec', 'MEDIUM'),
('RAD-BRZ','Radomsko-Brzeźnicka', 'MEDIUM');

INSERT INTO powerlinepart(idpowerline, span, wireType, geom)
    select
    1,
    span,
    case when uklad_prze = 'trojkatny' then 'TRIANGLE'::WIRE_TYPE
    when  uklad_prze = 'przeplot' then 'PRZEPLOT'::WIRE_TYPE
    else 'NO_DATA'
    end,
    geom from lubkoc;


INSERT INTO powerlinepart(idpowerline, idobject, span, wireType, geom)
    select
    3,
    objectid,
    num_odc,
    case when ukl_przew ~ 'tny' then 'TRIANGLE'::WIRE_TYPE
    when  ukl_przew ~ 'aski' then 'FLAT'::WIRE_TYPE
    else 'NO_DATA'
    end,
    geom from radbrz;

INSERT INTO powerlinepart(idpowerline, span, wireType, geom)
    select
    2,
    span,
    'NO_DATA',
    geom from sitwor;

INSERT INTO buffer(idpowerline, geom)
    select
    2,
    geom from sitwor-buffer;

INSERT INTO buffer(idpowerline, geom)
    select
    1,
    geom from lubkoc-buffer;

    INSERT INTO buffer(idpowerline, geom)
    select
    3,
    geom from "radbrz-buffer";


insert into alert(idpowerline, createdtime, area, category, geom)
select
    3,
    now(),
    10,
    'INTERNAL'::ALERT_CATEGORY,
    geom

    FROM "radbrz-alerts"


insert into alert(idpowerline, createdtime, area, category, geom)
select
    2,
    now(),
    10,
    'INTERNAL'::ALERT_CATEGORY,
    geom

FROM "sitwor-alerts";

insert into alert(idpowerline, createdtime, area, category, geom)
select
    1,
    now(),
    10,
    'INTERNAL'::ALERT_CATEGORY,
    geom

FROM "lubkoc-alerts";




alter table alert drop constraint alert_orders_id_fk;

alter table alert
    add constraint alert_orders_id_fk
        foreign key (idorder) references orders
            on delete set null;

alter table orderpowerline drop constraint orderpowerline_idorder_fkey;

alter table orderpowerline
    add constraint orderpowerline_orders_id_fk
        foreign key (idorder) references orders
            on delete cascade;
