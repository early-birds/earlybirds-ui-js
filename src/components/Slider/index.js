import { h, render, Component } from 'preact'
import enquire from 'enquire.js'
import json2mq from 'json2mq'
import './style.css'
import WithPaginate from '../WithPaginate'
import WithSliding from '../WithSliding'
import WithWindowResizing from '../WithWindowResizing'
import { cycleThrough } from '../../lib/Pagination'
import { toArrayOfXElement } from '../../lib/Utils'
import { generateSortedMediaQueriesFromList } from '../../lib/Json2MqParsing'

const GenerateSliderList = ({elementToShow, datas, children }) => {
  const list =
    toArrayOfXElement(
      datas.map(x =>
        <div className='slider-item' style={{width: (100 / elementToShow) + '%'}}>{x}</div>
      ), elementToShow)
    .map(x => <div className='slider-page'>{x}</div>)

  return children[0](list)
}

const Slider = ({ settings = {}, datas, children }) => {
  const { responsive = [], elementToShow = 5 } = settings

  return (
    <WithWindowResizing elementToShow={elementToShow} responsive={responsive}>
    {itemPerPage => (

      <GenerateSliderList elementToShow={itemPerPage} datas={datas}>
      {list => (

        <WithPaginate max={list.length-1} min={0}>
        {(offset, next, prev) => (

          <WithSliding list={list} offset={offset}>
          {() => (
            <div className='slider-container'>
              {children[0](list, next, prev, offset)}
            </div>
          )}
          </WithSliding>
        )}
        </WithPaginate>
      )}
      </GenerateSliderList>
    )}
    </WithWindowResizing>
  )
}

export default Slider
