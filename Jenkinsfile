def builderDocker
def CommitHash

pipeline {
    agent any 

    parameters {
        booleanParam(name: 'RunTest', defaultValue: true, description: 'Toggle this value for testing')
        choice(name: 'CICD', choices: ['CI', 'CICD','Rollback'], description: 'pick CI / CI, CD, or Rollback')
        
    }
    stages {
        stage('Clone Code') {
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'nopal',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: 'git clone https://github.com/afsanarozan/exam.git;',
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
                echo 'build..'
            }
        }

        stage('Run Testing') {
            steps{
                script {
                    sh 'echo passed'
                }
            }
        }
        
        stage('Build Image') {
            steps{
               script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'nopal',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        remoteDirectory: "exam",
                                        execCommand: "cd exam; sudo docker build -t afsanarozan/exam:v2 .",
                                        execTimeout: 6000,
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
                                configName: 'nopal',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        remoteDirectory: "exam",
                                        execCommand: 'cd exam; sudo kubectl apply -f simple-k8s-deployment.yml',
                                        execTimeout: 120000,
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