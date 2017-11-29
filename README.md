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
    {datas => {
      <RecosContainer datas={datas} />
      {mappedDatas =>  {
        <div>
          {mappedDatas}
        </div>
      })
    })
  </Recos>
</Identify>
```

We introduced 2 components from the earlybirds UI.

The first one is ```<Identify />``` that is used to identify a visitor.

The second one is ```<Recos />``` that retrieves the recommendation and
expect a renderfn that will be called with the datas

The third component ```<RecosContainer />``` do some intermediary processing and print the result.
Here is RecosContainer implementation :

```js
const RecosContainer = ({datas, children}) => {

  const mappedDatas = datas.map(x => <div>{x.product.title}</div>)
  <div>
    {children[0](mappedDatas)}
  </div>
}

/* output a list of product */
```

## Components UI

### ```<Identify profile={Object}>```
Accept a profile object as parameter and perform an identify request when needed.
Render its child when identify request is completed.

### ```<Recos widgetId='String' [automount={true}]>```
Accept a widgetId as parameter to retrieve the recommendations list.
Also expect a component attribute or a child component where the 'datas' will be rendered to as props.

widgetId (mandatory) : the widget id

automount (optional) : Earlybirds getRecommendations call returns a
location path where the widget will be mounted to. The default value is
`true`.
Can be set to `false` if you want to disable the feature.
You can also pass a selector (ex: 'body .another-location') if you want to mount the
widget elsewhere.

### ```<Slider settings={Object} elementToShow={Number}>```
Accept 'datas' as parameter and call a renderFn with the wrappedDatas.

elementToShow : number of element per slide

settings : accept a configuration to handle responsiveness
```js
const settings = {
  responsive: [{
    bp: 1024, // screen size
    elementToShow: 5
  },{
    bp: 768,
    elementToShow: 3
  },{
    bp: 480,
    elementToShow: 1
  }]
}
```

#### Example
```html
<Slider datas={datas} settings={settings}>
  {list => (
    <div>
      {list}
    </div>
  )}
</Slider>
```
datas object should be wrapped inside a component before passing it to
Slider.

It will display :
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
