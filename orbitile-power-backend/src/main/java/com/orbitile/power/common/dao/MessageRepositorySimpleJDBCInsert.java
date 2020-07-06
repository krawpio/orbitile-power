package com.orbitile.power.common.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class MessageRepositorySimpleJDBCInsert {

    SimpleJdbcInsert simpleJdbcInsert;

    @Autowired
    public MessageRepositorySimpleJDBCInsert(DataSource dataSource) {

    }
}
