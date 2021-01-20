def builderDocker
def CommitHash

pipeline {
    agent any 

    parameters {
        booleanParam(name: 'Run', defaultValue: true, description: 'Toggle this value for testing')
        choice(name: 'CICD', choices: ['CICD', 'CI'], description: 'pick CI / CI, CD, or Rollback')
        
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
                                        execCommand: 'cd exam; git pull',
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
                                        execCommand: 'cd exam; docker build -t afsanarozan/exam:v1 .',
                                    )
                                ]
                            )
                        ]
                    )
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
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'deploy',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'docker push afsanarozan/exam:v1; docker image prune -f',
                                    )
                                ]
                            )
                        ]
                    )
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
                                configName: 'deploy',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'cd exam; docker-compose up -d',
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
        stage('Run Testing Development') {
            when {
                expression {
                    CICD == 'CICD'
                }
            }
            steps{
                script {
                    sh 'echo passed'
                }
            }
        }
    }
}