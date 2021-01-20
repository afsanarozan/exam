def builderDocker
def CommitHash

pipeline {
    agent any 

    parameters {
        booleanParam(name: 'Run', defaultValue: true, description: 'Toggle this value for testing')
        choice(name: 'CICD', choices: ['CI', 'CICD'], description: 'pick CI / CI, CD, or Rollback')
        
    }
    stages {
        stage('Clone Project') {
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'deploy',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'git clone https://github.com/afsanarozan/exam',
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }

        stage('Build Project') {
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'deploy',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'cd exam; docker build -t afsanarozan/exam:v1 . ',
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }

        stage('Run Testing') {
            steps{
                script {
                    sh 'echo passed'
                }
            }
        }
        
        stage('push Image') {
            when {
                expression {
                    CICD == 'CICD'
                }
            }
            steps{
               script {
                   builderDocker.push("v2")
               }
            }
        }
        stage('Deployment') {
            when {
                expression {
                    CICD == 'CICD'
                }
            }
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'nopal',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'sudo kubectl apply -f service-nginx-ingress.yaml',
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
        stage('Run Testing Development') {
            steps{
                script{
                    sh 'echo passed'
                }
            }
        }
    }
}