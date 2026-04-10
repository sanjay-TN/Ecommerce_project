FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN mvn -B -DskipTests clean package && cp target/*.jar app.jar

FROM eclipse-temurin:17-jre

WORKDIR /app

ENV SERVER_PORT=8080
ENV UPLOAD_DIR=/app/uploads

COPY --from=build /app/app.jar ./app.jar

RUN mkdir -p /app/uploads

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
