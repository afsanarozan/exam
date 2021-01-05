def builderDocker
def CommitHash

pipeline {
    agent any 

    parameters {
        booleanParam(name: 'RunTest', defaultValue: true, description: 'Toggle this value for testing')
        choice(name: 'CICD', choices: ['CI', 'CICD','Rollback'], description: 'pick CI / CI, CD, or Rollback')
        
    }
    stages {
        // stage('Clone Code') {
        //     steps{
        //        script {
        //             sshPublisher(
        //                 publishers: [
        //                     sshPublisherDesc(
        //                         configName: 'nopal',
        //                         verbose: false,
        //                         transfers: [
        //                             sshTransfer(
        //                                 execCommand: 'git clone https://github.com/afsanarozan/exam.git;',
        //                             )
        //                         ]
        //                     )
        //                 ]
        //             )
        //         }
        //     }
        // }

        stage('Build Project') {
            steps{
                script{
                   sh 'docker system prune --all',
                   builderDocker = docker.build('afsanarozan/exam:v2')
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