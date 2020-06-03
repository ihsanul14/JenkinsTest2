def project = "concrete-plasma-244309"
def appName = 'bri360-dashboard-summary-report'
def namespace = "customer-360"
def proxyType = "http"
def proxyAddress = "172.18.104.20"
def proxyPort = "1707"

pipeline {
  agent {
    kubernetes {
      label 'jnlp-slave'
      defaultContainer 'jnlp'
      yaml """
        apiVersion: v1
        kind: Pod
        metadata:
        labels:
          component: ci
        spec:
          serviceAccountName: cd-jenkins
          containers:
          - name: node
            image: node:12.6.0
            command:
            - cat
            tty: true
          - name: gcloud
            image: google/cloud-sdk:latest
            command:
            - cat
            tty: true
          - name: helm
            image: alpine/helm:2.14.0
            command:
            - cat
            tty: true
          - name: jnlp
            image: mfahry/bri-jnlp-slave:1.7
        """
    }
  }
  
  stages {
    // stage('Quality Node') {
    //   environment {
    //     scannerHome = tool 'sonarscanner'
    //   }
    //   steps {
    //     withSonarQubeEnv('sonarqube') {
    //       sh "${scannerHome}/bin/sonar-scanner -X"
    //     }
    //   }
    // }
    //   stage("Unit Test") {
    //     steps {
    //       container("node") {
    // //        sh "npm install"
    // //        sh "npm test"

    //           sh "echo Skip this processing ..."
    //       }
    //     }
    //   }
    stage("build image") {
      environment {
        IMAGE_REPO = "gcr.io/${project}/${appName}"
        IMAGE_TAG = "${env.GIT_COMMIT.substring(0,7)}"
      }  
      // when {
      //   branch 'sv-branch'
      // }
      steps {
        container("gcloud") {
          // sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${IMAGE_REPO}:${IMAGE_TAG} ."
        withCredentials([file(credentialsId: "k8s-builder-prod", variable: "JSONKEY")]) {
            sh "gcloud config set proxy/type ${proxyType}"
            sh "gcloud config set proxy/address ${proxyAddress}"
            sh "gcloud config set proxy/port ${proxyPort}"
            sh "gcloud config set builds/timeout 7200"

            sh "cat ${JSONKEY} >> key.json"
            sh "gcloud auth activate-service-account --key-file=key.json"
            sh "gcloud builds submit --project ${project} --tag ${IMAGE_REPO}:${IMAGE_TAG} ."
          }
        }
      }
    }
    stage("Deploy to development") {
      when {
        branch 'sv-branch'
      }
      environment {
        IMAGE_REPO = "gcr.io/${project}/${appName}"
        IMAGE_TAG = "${env.GIT_COMMIT.substring(0,7)}"
      }
      steps {
        container("helm") {
          //  sh "helm upgrade --debug --install -f helm/values.dev.yml --set-string image.repository=${IMAGE_REPO},image.tag=${IMAGE_TAG} ms-dgb-dashboard ./helm/ms-dgb-dashboard"
        withCredentials([file(credentialsId: "kubeconfig", variable: "KUBECONFIG")]) {
            // setup kube config
            sh "mkdir -p ~/.kube/"
            sh "cat ${KUBECONFIG} >> ~/.kube/config"
            
            sh """
              helm upgrade ${appName} ./helm/${appName} \
                --set-string image.repository=${IMAGE_REPO},image.tag=${IMAGE_TAG} \
                -f helm/${appName}/values.development.yaml --debug --install --namespace ${namespace}
            """
          }       
        }
      }
    }  
    stage("Deploy to production") {
      when {
        branch 'master'
      }
      environment {
        IMAGE_REPO = "gcr.io/${project}/${appName}"
        IMAGE_TAG = "${env.GIT_COMMIT.substring(0,7)}"
      }
      steps {
        container("helm") {
        // sh "helm upgrade --debug --install -f helm/values.prd.yml --set-string image.repository=${IMAGE_REPO},image.tag=${IMAGE_TAG} ms-dgb-dashboard ./helm/ms-dgb-dashboard"
        withCredentials([file(credentialsId: "kubeconfig", variable: "KUBECONFIG")]) {
            // setup kube config
            sh "mkdir -p ~/.kube/"
            sh "cat ${KUBECONFIG} >> ~/.kube/config"
            
            sh """
              helm upgrade ${appName} ./helm/${appName} \
                --set-string image.repository=${IMAGE_REPO},image.tag=${IMAGE_TAG} \
                -f helm/${appName}/values.production.yaml --debug --install --namespace ${namespace}
            """
            }
          }
        }
      }
    }
  }