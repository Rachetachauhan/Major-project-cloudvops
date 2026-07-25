
# Major-project-cloudvops
first project
web hook testing2

# Cloud DevOps CI/CD Deployment Project 

## Overview

This project demonstrates an end-to-end CI/CD pipeline for deploying a web application using AWS and DevOps tools.

The application deployment workflow is automated using GitHub, Jenkins, Docker, Amazon ECR, and AWS infrastructure.

## Architecture

Developer
|
GitHub
|
GitHub Webhook
|
Jenkins CI/CD
|
Docker Build
|
Amazon ECR
|
AWS EC2
|
Application Load Balancer
|
Auto Scaling Group
|
Application


## Technologies Used

- AWS EC2
- Amazon ECR
- Jenkins
- Docker
- Docker Compose
- Git & GitHub
- Linux Ubuntu
- Application Load Balancer
- Auto Scaling Group


## CI/CD Workflow

1. Developer pushes code to GitHub
2. GitHub webhook triggers Jenkins pipeline
3. Jenkins pulls latest code
4. Docker image is built
5. Image is pushed to Amazon ECR
6. Application is deployed on AWS EC2
7. ALB distributes traffic
8. ASG manages application scalability


## Features

- Automated CI/CD deployment
- Docker containerization
- Cloud-based deployment
- Load balancing
- Auto scaling


## Author

Racheta Chauhan

