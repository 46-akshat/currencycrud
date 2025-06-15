# Stage 1: Build using Java 21 + Maven manually
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy project files
COPY . .

# Build the project
RUN mvn clean package -DskipTests

# Stage 2: Run the app using Java 21
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/target/currency-exchange-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
