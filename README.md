![Cellery Logo](docs/images/cellery-logo.svg)

[![GitHub (pre-)release](https://img.shields.io/github/release/wso2-cellery/sdk/all.svg)](https://github.com/wso2-cellery/sdk/releases)
[![GitHub (Pre-)Release Date](https://img.shields.io/github/release-date-pre/wso2-cellery/sdk.svg)](https://github.com/wso2-cellery/sdk/releases)
[![GitHub last commit](https://img.shields.io/github/last-commit/wso2-cellery/sdk.svg)](https://github.com/wso2-cellery/sdk/commits/master)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Cellery is a code-first approach to building, integrating, running and managing composite microservice applications on Kubernetes. 
Build, push/pull, run, scale and observe composites. Secure APIs by default. Code in any language.

----

## Getting Started
### Pre requisites 
1. kubectl v1.11 or higher
2. Existing Kubernetes cluster or VirtualBox (if local installation is required) or Google Cloud SDK (if required to install cellery mesh in GCP)

### How to Install

#### Linux
Download the [cellery-ubuntu-x64-0.2.0.deb](https://wso2.org/jenkins/job/cellery/job/sdk/) and install it using dpkg command as shown below.
```
dpkg -i cellery-ubuntu-x64-0.1.0.deb
```
#### Mac OS
Download [cellery-0.2.0.pkg](https://wso2.org/jenkins/job/cellery/job/sdk/) and install it by following macOS package installation steps.

### Set up Cellery Runtime
Once the cellery is installed, verify the installation by executing `cellery version` command. 

You can install the cellery runtime locally as a virtual machine (`Local`) or in google cloud platform (`GCP`) 
or in any kubernetes cluster (`Existing cluster`). The installation options can be selected [interactively](#interactive-mode-setup) or by passing [inline command](#inline-command-mode-setup) options.  

If you don't have kubernetes cluster running, then you can either select `Local` or `GCP `. If you have the access for kubernetes cluster, then select `Existing cluster` 
to install cellery into that cluster.  Further,  `Local` option will spawn a new kubernetes cluster in a virtual machine with cellery 
runtime pre-installed, and `GCP` option will start a new kubernetes cluster in provided GCP account and install cellery. 

Further, cellery can be installed in two flavours; Basic or Complete. Basic has minimal cellery system installation, and 
Complete has full set of components for cellery which includes API Manager and Observability. 

| Packages | Components | Supported Functionality | 
|----------|------------|-------------------------|
| Basic | <ul><li>Cell controller</li><li>Light weight Identity Provider</li><li>Database</li></ul>| <ul><li>HTTP(S) cells with local APIs</li><li>Full support for web cells</li><li>Inbuilt security for inter cell and intra cell communication</li></ul> |
| Complete | <ul><li>Cell controller</li><li>Global API manager</li><li>Observability portal and components</li><li>database</li></ul> | <ul><li>Full HTTP(S) cells with local/global APIs</li><li>Full support for web cells</li><li>Inbuilt security for inter cell and intra cell communication</li><li>API management functionality</li><li>observability of cells with rich UIs</li></ul> |

##### Interactive mode setup
This mode will guide through the available options in each steps, and it's ideal for the first time use to install cellery. 

1. Execute `cellery setup` command to configure Cellery runtime. This 
will prompt a list of selections. There are three options to select from; create, manage, modify and switch. By selecting 
`create ` section users can setup the Cellery runtime. 
```
$ cellery setup
[Use arrow keys]
? Setup Cellery runtime
    Manage
  ➤ Create
    Modify
    Switch
    EXIT
```

2. Based on your installation requirement, and availability of kubernetes cluster, you can select the installation type. 
Please note, you can have multiple installations at the same time such as one Local setup, and multiple GCP setups. 
```
$ ✔ Create
[Use arrow keys]
? Select an environment to be installed
  ➤ Local
    GCP
    Existing cluster
    BACK
```

##### Inline command mode setup
Instead of selecting each options one by one, you also can use the inline commands to perform the setup operations. 
The below are the list of inline commands to setup cellery.

| Setup Option | Package | Command | Description |
|--------------|------|---------|-------------|
| Local | Basic | `cellery setup create local` | Creates basic local setup. This download a VM and installs to your machine. You will require Virtual Box as pre-requisite to perform this operation| 
| Local | Complete | `cellery setup create local --complete` | Creates complete local setup. This download a VM with complete cellery runtime and installs to your machine. You will require Virtual Box as pre-requisite to perform this operation| 
| GCP | Basic | `cellery setup create gcp` | Creates basic GCP setup. This will spawn a GCP kubernetes cluster and create resources for the cellery runtime. You will require GCloud SDK as pre-requisite to perform this operation. Please check [GCP](#2.-gcp) for the steps.| 
| GCP | Complete | `cellery setup create gcp --complete` | Creates complete GCP setup. This will spawn a GCP kubernetes cluster and create resources for the cellery runtime. You will require GCloud SDK as pre-requisite to perform this operation. Please check [GCP](#2.-gcp) for the steps| 
                                    

#### 1. Local Setup
This will setup the local environment, by creating a virtual machine with pre-installed kubeadm and cellery runtime. 

1) As mentioned above this can be installed with interactive mode by selecting Create > Local > Basic or Complete options or executing inline command with `cellery setup create local [--complete]`.

2) Add below to /etc/host entries to access cellery hosts.
    ```
    192.168.56.10 wso2-apim cellery-dashboard wso2sp-observability-api wso2-apim-gateway cellery-k8s-metrics idp.cellery-system pet-store.com hello-world.com my-hello-world.com
    ```
3) Once the installation process is completed, you can [create your first cell](#build-and-deploy-your-first-cell).

#### 2. GCP
To create a GCP based cellery installation, you need to have GCP account and [Gloud SDK](https://cloud.google.com/sdk/docs/) installed in your machine. 
Follow the below steps to install cellery into your GCP.

1. Use gloud init command and create a project if not exists. Make sure gcloud is configured to the project which you want to install cellery runtime.
    ```
    gcloud init
    ```
2. Make sure zone and region is set correctly for the project. Execute below mentioned command.
    ```
    gcloud config list --format json
    ```
    The expected output from the command should be as below with zone, and region fields.
    ```json
    {
      "compute": {
        "region": "us-central1",
        "zone": "us-central1-c"
      },
      "core": {
        "account": "testcellery@gmail.com",
        "disable_usage_reporting": "True",
        "project": "cellery-gcp-test"
      }
    }
    ```
3. If region or zone is not set as above, then please go to [GCP console](https://console.cloud.google.com/compute/settings?_ga=2.20830648.-1274616255.1554447482), and select default zone and region for your project created. 
   OR 
   Use gcloud CLI to set the project zone and the region.
   ```
   gcloud config set project <project name>
   gcloud config set compute/region <region>
   gcloud config set compute/zone <zone>
   ```
4. Cellery uses some APIs to create resources in the GCP, therefore we need to enable the below listed APIs. 
You can enable this via the GCP Dashboard by going to menu pane, and selecting APIs and Services > Dashboard options. 
    - Cloud Engine API
    - Kubernetes API
    - Cloud Filestore API
    - Cloud SQL Admin API

    Or you can execute commands via gcloud as below.
    ```
    gcloud services enable container.googleapis.com file.googleapis.com sqladmin.googleapis.com
    ```
5. Since cellery creates the resources in the GCP, it needs the API key to access the above mentioned APIs. Hence create the key for default service account via 
selecting IAM & Admin > Service Account from left menu pane. And then select the default service account > Create Key > JSON options, and download the JSON file. Copy the 
downloaded JSON file into directory `$HOME/.cellery/gcp folder`.

6. Now we are ready install cellery into GCP. Run `cellery setup` command and select Create > GCP > Basic or Complete from the menu OR 
executing inline command with `cellery setup create gcp [--complete]`.

    ```
    cellery setup
    $ ✔ Create
    [Use arrow keys]
    ? Select an environment to be installed
        Local
      ➤ GCP
        BACK
    ```
    OR 
    ```
    cellery setup create gcp [--complete]
    ```

    This will start the process of creating a Cellery runtime in GCP.
    ```
    ✔ Creating GKE client
    ✔ Creating GCP cluster
    ⠸ Updating kube config clusterFetching cluster endpoint and auth data.
    ⠼ Updating kube config clusterkubeconfig entry generated for cellery-cluster520.
    ✔ Updating kube config cluster
    ✔ Creating sql instance
    ✔ Creating gcp bucket
    ✔ Uploading init.sql file to dcp bucket
    ✔ Updating bucket permission
    ✔ Importing sql script
    ✔ Updating sql instance
    ✔ Creating NFS server
    ✔ Deploying Cellery runtime
    
    ✔ Successfully installed Cellery runtime.
    
    What's next ?
    ======================
    To create your first project, execute the command:
      $ cellery init
    ```
    When the process is completed Cellery will point to the newly created GCP cluster and user can start working on a 
    Cellery project. 

7. Get the Nginx Ip and add it to the /etc/hosts. Run the following kubectl command to get the IP address.
    ```
    kubectl get ingress -n cellery-system
    ```
    Then update the /etc/hosts file with that Ip as follows.  
    ```
    <IP Address> wso2-apim cellery-dashboard wso2sp-observability-api wso2-apim-gateway cellery-k8s-metrics idp.cellery-system pet-store.com hello-world.com my-hello-world.com
    ```
### Quick start with cellery
Let's quickly run a sample hello world cell by following below steps.

1) Execute below command that will download the hello world web cell from `wso2cellery` organization in [docker hub](https://hub.docker.com/u/wso2cellery) and run the cell.
    ```
    $ cellery run wso2cellery/cells-hello-world-webapp:0.1.0 -n hello
    ✔ Connecting to registry-1.docker.io
    ✔ Fetching metadata
    ✔ Pulling image wso2cellery/cells-hello-world-webapp:0.1.0
    ✔ Saving new Image to the Local Repository
    
    Image Digest : sha256:2d5659e5787df7e7ae0f58671c0b9d857b5a19e5fbdb02fccbc98a64016a97f6
    
    ✔ Extracting Cell Image wso2cellery/cells-hello-world-webapp:0.1.0
    
    Main Instance: hello
    
    ✔ Reading Cell Image wso2cellery/cells-hello-world-webapp:0.1.0
    ✔ Validating dependencies
    
    Instances to be Used:
    
      INSTANCE NAME                   CELL IMAGE                   USED INSTANCE   SHARED
     --------------- -------------------------------------------- --------------- --------
      hello           wso2cellery/cells-hello-world-webapp:0.1.0   To be Created    -
    
    Dependency Tree to be Used:
    
     No Dependencies
    
    ? Do you wish to continue with starting above Cell instances (Y/n)?
    
    ✔ Starting main instance hello
    
    
    ✔ Successfully deployed cell image: wso2cellery/cells-hello-world-webapp:0.1.0
    
    What's next?
    --------------------------------------------------------
    Execute the following command to list running cells:
      $ cellery list instances
    --------------------------------------------------------
    ```
2) Optionally you can run `kubectl` or `cellery` commands to check whether all pods are up and running. 
    ```
    $ kubectl get pods
    NAME                                         READY     STATUS        RESTARTS   AGE
    hello--gateway-deployment-65fd8668cb-k7dqp   1/1       Running       0          2m
    hello--hello-deployment-6df6fcbd8c-2s65r     2/2       Running       0          2m
    hello--sts-deployment-6dc7958bbb-sg992       2/2       Running       0          2m
    ```
    OR
    
    ```
    $ cellery list instances
                      INSTANCE                                   CELL IMAGE                   STATUS                            GATEWAY                            COMPONENTS            AGE
     ------------------------------------------ -------------------------------------------- -------- ----------------------------------------------------------- ------------ -----------------------
      hello                                      wso2cellery/cells-hello-world-webapp:0.1.0   Ready    hello--gateway-service                                      1            30 minutes 48 seconds
    ```

3) Now access the [http://hello-world.com/](http://hello-world.com/) and you will be landed in the hello world web page. 

Congratulations! You have successfully got running the first web cell running!  


### Build and Deploy your first Cell 
In this section let's focus on initialize, build, run and push a hello world cell. Follow the instructions listed below to create your first cell.

1. Execute cellery init command from the command prompt, and provide the project name as ‘hello-world-cell’. 
    ```
    $ cellery init
    ? Project name:  [my-project] hello-world-cell
    
    
    ✔ Initialized project in directory: /Users/cellery/hello-world-cell
    
    What's next?
    --------------------------------------------------------
    Execute the following command to build the image:
      $ cellery build helloworld/helloworld.bal [repo/]organization/image_name:version
    --------------------------------------------------------
    ```
2. The above step will auto generate a cellery file in the location: hello-world-cell/hello-world-cell.bal with below content. 
The cell `helloCell` consists of one component defined as `helloComponent` and it has one web ingress with default vhost `hello-world.com`.
An environment variable `HELLO_NAME`with default value `Cellery` is used by `helloComponent` to render the webpage. By passing the  parameters in the runtime, the vhost entry and
env variable HELLO_NAME can be modified.

    ```ballerina
    import ballerina/config;
    import celleryio/cellery;
    
    // Hello Component
    // This Components exposes the HTML hello world page
    cellery:Component helloComponent = {
        name: "hello",
        source: {
            image: "wso2cellery/samples-hello-world-webapp"
        },
        ingresses: {
            webUI: <cellery:WebIngress> { // Web ingress will be always exposed globally.
                port: 80,
                gatewayConfig: {
                    vhost: "hello-world.com",
                    context: "/"
                }
            }
        },
        envVars: {
            HELLO_NAME: {value: "Cellery"}
        }
    };
    
    // Cell Initialization
    cellery:CellImage helloCell = {
        components: {
            helloComp: helloComponent
        }
    };
    
    # The Cellery Lifecycle Build method which is invoked for building the Cell Image.
    #
    # + iName - The Image name
    # + return - The created Cell Image
    public function build(cellery:ImageName iName) returns error? {
        return cellery:createImage(helloCell, iName);
    }
    
    # The Cellery Lifecycle Run method which is invoked for creating a Cell Instance.
    #
    # + iName - The Image name
    # + instances - The map dependency instances of the Cell instance to be created
    # + return - The Cell instance
    public function run(cellery:ImageName iName, map<cellery:ImageName> instances) returns error? {
        string vhostName = config:getAsString("VHOST_NAME");
        if (vhostName !== ""){
            cellery:WebIngress web = <cellery:WebIngress> helloComponent.ingresses.webUI;
            web.gatewayConfig.vhost = vhostName;
        }
    
        string helloName = config:getAsString("HELLO_NAME");
        if (helloName !== ""){
            helloComponent.envVars.HELLO_NAME.value = helloName;
        }
        return cellery:createInstance(helloCell, iName);
    }
    ```

3. Build the cellery image for hello world project by executing the cellery build command as shown below. Note `DOCKER_HUB_ORG` is your organization name in docker hub.
    ```
    $ cellery build hello-world-cell.bal <DOCKER_HUB_ORG>/hello-world-cell:1.0.0
    Hello World Cell Built successfully.
    
    ✔ Building image <DOCKER_HUB_ORG>/hello-world-cell:1.0.0
    ✔ Saving new Image to the Local Repository
    
    
    ✔ Successfully built cell image: <DOCKER_HUB_ORG>/hello-world-cell:1.0.0
    
    What's next?
    --------------------------------------------------------
    Execute the following command to run the image:
      $ cellery run <DOCKER_HUB_ORG>/helloworld:1.0.0
    --------------------------------------------------------
    ```

4. Note that in the cell file's run method at step-2, it's looking for runtime parameters `VHOST_NAME` and `HELLO_NAME`, 
and if it's available then it'll will be using those as vhost and greeting name. Therefore run the built cellery image with ‘cellery run’ command, 
and pass `my-hello-world.com` for `VHOST_NAME`, and your name for `HELLO_NAME` as shown below. 
    ```
    $ cellery run <DOCKER_HUB_ORG/hello-world-cell:1.0.0 -e VHOST_NAME=my-hello-world.com -e HELLO_NAME=WSO2 -n my-hello-world
       ✔ Extracting Cell Image  <DOCKER_HUB_ORG/hello-world-cell:1.0.0
       
       Main Instance: my-hello-world
       
       ✔ Reading Cell Image  <DOCKER_HUB_ORG/hello-world-cell:1.0.0
       ✔ Validating environment variables
       ✔ Validating dependencies
       
       Instances to be Used:
       
         INSTANCE NAME              CELL IMAGE                      USED INSTANCE   SHARED
        ---------------- ----------------------------------------- --------------- --------
         my-hello-world    <DOCKER_HUB_ORG>/hello-world-cell:1.0.0   To be Created    -
       
       Dependency Tree to be Used:
       
        No Dependencies
       
       ? Do you wish to continue with starting above Cell instances (Y/n)?
       
       ✔ Starting main instance my-hello-world
       
       
       ✔ Successfully deployed cell image:  <DOCKER_HUB_ORG>/hello-world-cell:1.0.0
       
       What's next?
       --------------------------------------------------------
       Execute the following command to list running cells:
         $ cellery list instances
       --------------------------------------------------------
    ```
    
5. Now your hello world cell is deployed, you can run the cellery list instances command to see the status of the deployed cell.
    ```
    $ cellery list instances
                        INSTANCE                                   CELL IMAGE                   STATUS                            GATEWAY                            COMPONENTS           AGE
       ------------------------------------------ -------------------------------------------- -------- ----------------------------------------------------------- ------------ ----------------------
        hello-world-cell-1-0-0-676b2131   sinthuja/hello-world-cell:1.0.0              Ready    sinthuja-hello-world-cell-1-0-0-676b2131--gateway-service   1            10 minutes 1 seconds
    ```
    
6. Access url [http://my-hello-world.com/](http://my-hello-world.com/) from browser. You will updated web page with greeting param you passed for HELLO_NAME in step-4.

7. As a final step, let's push your first cell project to your docker hub account. Tp perform this execute `cellery push` as shown below.
    ```
    $ cellery push <DOCKER_HUB_ORG>/hello-world-cell:1.0.0
    ✔ Connecting to registry-1.docker.io
    ✔ Reading image <DOCKER_HUB_ORG>/hello-world-cell:1.0.0 from the Local Repository
    ✔ Checking if the image <DOCKER_HUB_ORG>/hello-world-cell:1.0.0 already exists in the Registry
    ✔ Pushing image <DOCKER_HUB_ORG>/hello-world-cell:1.0.0
    
    Image Digest : sha256:8935b3495a6c1cbc466ac28f4120c3836894e8ea1563fb5da7ecbd17e4b80df5
    
    
    
    ✔ Successfully pushed cell image: <DOCKER_HUB_ORG>/hello-world-cell:1.0.0
    
    What's next?
    --------------------------------------------------------
    Execute the following command to pull the image:
      $ cellery pull <DOCKER_HUB_ORG>/hello-world-cell:1.0.0
    --------------------------------------------------------
    ```
 Congratulations! You have successfully created your own cell, and completed getting started!
 
  
