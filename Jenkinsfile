pipeline {
    agent any

    stages {
        stage('检出代码') {
            steps {
                // 从版本控制系统中检出代码
                checkout scm
            }
        }

        stage('构建docker镜像') {
            steps {
                script {
                    // 构建 Docker 镜像
                    docker.build("dcy-resource-repository:latest", ".")
                }
            }
        }

        stage('推送镜像到Harbor') {
            steps {
                script {
                    // 登录 Harbor 仓库
                    docker.withRegistry('harbor.meta.com/dcy-resource-repository', 'dcyjs-harbor-credentials') {
                        // 推送 Docker 镜像到 Harbor
                        docker.image("dcy-resource-repository:latest").push()
                    }
                }
            }
        }

        stage('运行容器') {
            steps {
                // 在服务器上运行 Docker 容器
                sh 'ssh user@your-server "docker run -d -p 8080:80 dcy-resource-repository:latest"'
            }
        }
    }
}
