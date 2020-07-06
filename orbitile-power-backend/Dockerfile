FROM openjdk:11-jdk-alpine
VOLUME /tmp
# ARG JAR_FILE
COPY ./target/orbitile-power-backend.war app.war
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
