# Back End
The backend is MongoDB hosted on Azure, with interaction occurring through CosmosDB.

This directory dedicated to building and testing the database. 


<hr>

## Running
1. Navigate to this directory.
2. Run ```node fileName.js``` to run your script.

### Prerequisites
#### .env
```shell
COSMOS_CONNECTION_STRING="connectionStringProvidedByAzure"
```


<hr>

## Additional Resources
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass) - GUI for MongoDB
> **Note**:
> You may need to configure your [Network Firewall in Azure](https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-configure-firewall) to allow
> Compass or your code to interact with your database. 