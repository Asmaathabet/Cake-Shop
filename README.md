# Cake Shop

a Demo built by Redux toolkit 


## Core Concepts :
### Entities : 
 - shop : store case in a shelf
 - shopkeeper: behind the counter
 - customer: at the store entrance

### Activities : 
- Customer:  Order a cake
- Shop keeper:  - Box cake from a shelf
                - Receipt to keep track 

### ITEMS: 
- Shop : Store [hold the state of your application]
- Cake Ordered : Action [ Describe what happened in the application]
- Shop Keeper: Reducer [handle actions and decide how to update the state]


## Three principles :

### 1- The Global state is stored as an object inside a single store. 

- Cake Shop [Tracking number of cake on the shelf]

```js
{
    numberOfCakes: 10
}
```
  
### 2- The Only way to change the state is to dispatch an action, an object that describes what happened. 

- Cake Shop  [Scan QR Code and Place an order] -- Action [CAKE_ORDERED]
  ```js
  {
    type : 'CAKE_ORDERED'
  }
  ```

 ### 3- To Specify how the state tree is updated based on actions, you write pure reducers
 Reducer - (previousState, action) ==> newState

- Cake Shop  - Reducer is the ShopKeeper
 
```js
 const reducer = (state = initalState , action) =>{
   switch(action.type){
    case CAKE_ORDERED: 
    return {
        numberOfCakes : state.numberOfCakes -1
    }
   }
 }
  ```

### Redux Workflow: 

![redux-workflow](src/images/redux-workflow.JPG)
  