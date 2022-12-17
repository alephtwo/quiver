FROM maven:3.8.6-eclipse-temurin-17-alpine as build
WORKDIR /workspace/app
COPY pom.xml .
COPY src src
RUN mvn clean package -DskipTests=true

FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /workspace/app/target/quiver-*.jar /app/quiver.jar
ENTRYPOINT ["java", "-jar", "/app/quiver.jar"]
