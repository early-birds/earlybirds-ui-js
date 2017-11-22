# Earlybirds for Preact

Earlybirds for preact is a wrapper around the earlybirds-js project and provides a set of components and helpers that'll facilitate the implementation of earlybirds.

## Getting started

Let's say we have this recommendations block in our website and we want to display the earlybirds's recommendations instead of ours:

```html
<div id='recommendations'>
  <!-- to be replaced -->
</div>
```

### Explanation : the workflow 
First, we need to create a datasourceId in our platform that corresponds to a customer referential ( internet account, CRM, … )

We can now make an identify request by providing a profile object that contains : 
```js
// case 1 : Create a new user
profile: {}

// case 2 : Identify the user by its profile id
profile: {
  id: {{profileId}}, 
}

// case 3 : Matching between visitor id and earlybirds profile id
// if you use this option, all properties are mandatory
profile: {
  datasources: [{
    id: {{datasourceId}} // the customer referential id,
    originalId: {{originalId}} // customer id in your referential
  }]
}
```

The identify request returns a profile ID that should be stored in a cookie for later use so we should re-trigger an identify only when needed (profile has changed or cookie is expired). The implementation detail is abstracted away because we use the earlybirds-js library from which earlybirds-ui is based on.

We then trigger the recommendation request by providing the widgetId and the profileId.

### Implementation with preact

```html
<Identify profile={PROFILE_CONFIG}>
  <Recos widgetId='WIDGET_ID'>
    <RecosContainer />
  </Recos>
</Identify>
```

We introduced 2 components from the earlybirds UI.

The first one is ```<Identify />``` that is used to identify a visitor.

The second one is ```<Recos />``` that retrieves the recommendation and render it in the good location.

The third component ```<RecosContainer />``` will get a 'datas' props injected
and can be used to display the result: 
```js
const RecosContainer = ({datas}) =>
  <div>
    { datas.map(x => <div>{x.product.title}</div>) }
  </div>

/* output a list of product */
```

## Components UI

### ```<Identify profile={Object}>```
Accept a profile object as parameter and perform an identify request when needed.
Render its child when identify request is completed.

### ```<Recos widgetId='String'>```
Accept a widgetId as parameter to retrieve the recommendations list.
Also expect a component attribute or a child component where the 'datas' will be rendered to as props.

### ```<Slider settings={Object} elementToShow={Number}>```
Accept a list of children and generate a slider.

elementToShow : number of element per slide

settings : accept a configuration to handle responsiveness
```js
const settings = {
  responsive: [{
    breakpoint: 1024, // screen size
    elementToShow: 5
  },{
    breakpoint: 768,
    elementToShow: 3
  },{
    breakpoint: 480,
    elementToShow: 1
  }]
}
```

#### Example
```html
<Slider settings={settings}>
  <div className='item'> Product </div>
  <div className='item'> Product </div>
  <div className='item'> Product </div>
  <div className='item'> Product </div>
  <!-- ... -->
</Slider>
```
Elements should have an 'item' class for this to work

Will display : 
  - 5 elements when the screen size is 768 or above
  - 3 elements when the screen size is between 480 and 768
  - 1 element when the screen size is under 480

## Configuration
In order to work, we need to enable the css module in webpack
```js
rules: [
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader?modules&importLoaders=1']
  }
]
```

## Testing
```bash
# run the tests
npm run test
```

## See also
[Earlybirds-js](https://github.com/early-birds/earlybirds-js)

[Earlybirds API documentation](http://doc.early-birds.fr/)