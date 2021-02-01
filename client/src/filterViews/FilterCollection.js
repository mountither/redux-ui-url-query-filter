import React, {useState, useEffect} from "react";
import { Collapse } from 'antd';
import CheckboxFilter from './CheckboxFilter'
import {useSelector, useDispatch} from 'react-redux'
import {increment} from '../actions-example'
import { Checkbox} from 'antd';
import { addFilter,removePath, updateURL, clearFilters, clearAllQuery} from '../actions';

import 'antd/dist/antd.dark.css'
import CheckableTag from "antd/lib/tag/CheckableTag";
let render = 1;

function areEqual(prevProps, nextProps) {
    
  return prevProps.state.filters === nextProps.state.filters;
  // the component will be updated only on `contact` props changes.
}

const FilterCollection = () =>{
  const dispatch = useDispatch()
  
  const state = useSelector(state => state)
  console.log('state seen in item comp: ',state);
    
    const [Filtered, setFilters] = useState({
        cat: [],
        brn: [],
        fnh: [],
        hld: [],
        hrt: [],
    });

    
    
    const [Products, setProducts] = useState([]);
    const [IgnoreData, setIgnoreData] = useState(0);
    const [BoundData] = useState(4);
    const [OnPageSize, setOnPageSize] = useState();
    const [loading, setLoading] = useState(false);
    const [productAmount, setProductAmount] = useState();


    const handleFilters = (filters, category) => {

        const newFilters = {...Filtered}

        newFilters[category] = filters
        revealResults(newFilters)
        setFilters(newFilters);

    }

     
    useEffect(() => {

      // initialise the page with all products 
      // the skip and limit are acknowledged with every render (sent to mongodb)
      const data = {
        skip: IgnoreData,
        limit: BoundData
      }
      getProducts(data)

    }, []);
    

    const getProducts = async (config) => {
    
      // console.log(config.filters)
      // try{

      //   setLoading(true)
      //   const res = await fetch(`http://localhost:8000/api/products`, {
      //   method: 'POST',
      //   body: JSON.stringify(config),
      //   headers: { 
      //       'Content-Type': 'application/json'
      //   } 
      //   });
      //   if (!res.ok) {      
      // 		throw new Error('Failed to fetch product')
      //   } 
        
      //   const prodData = await res.json()
      //   // if config loadmore is set to true (loadmore btn is clicked), append the incoming products here
        
      //   setProductAmount(prodData.count)

      //   if(config.loadMore){

      //     setProducts([...Products, ...prodData.prods])
          
      //   }
      //   else{
      //     setProducts(prodData.prods);
      //   }

      //   setOnPageSize(prodData.onPgeSize)

      //   setLoading(false);
      // }
      // catch(err)
      // {
      //   console.log('connection to product database failed ' + err)
      // }
    }
    // console.log(Filtered)
    const revealResults = (filters) => {

      const variables ={ skip: 0,
                        limit: BoundData,
                        filters: filters
                      }

      getProducts(variables)
      // should not ignore products (skip in mongodb) when purely filtered
      setIgnoreData(0)

  }

  const onLoadMore = () => {
    const skip = IgnoreData + BoundData;

    const variables = {
        skip: skip,
        limit: BoundData,
        loadMore: true,
        filters: Filtered
    }

    getProducts(variables)
    setIgnoreData(skip)


}


const handleChange = (value, field) => {

  dispatch(addFilter(value.id, field))

  if (!value.active){
      console.log('url updated');
      dispatch(updateURL(value.id, field))
  }else{
      console.log("path removed");
      dispatch(removePath(value.id, field))

  }
  handleFilters(value.id)
}

const { Panel } = Collapse;


return (
  <>
       
        {
          state.productFilter.map((type, i)=> {
            // console.log('see from render ',type)
            
            // if (type.field_name === "cat"){
            //   console.log('obj reduce:', type.data.reduce((sum, next) => {return sum && next.active}))
            // }
            return (
              <React.Fragment key={i}>
                {/* touched previous state tells whether either one  */}
                    <Collapse defaultActiveKey={type.filter_triggered ? type.field_name : ''} 
                        className={type.data.some((sum) =>  sum.active ) ? 'highlight-border': ''}>
                        <Panel header={type.title} key={type.field_name}>
                        {type.data.map((value, i) => {
                          return (
                            <Checkbox
                              key={i}
                              onChange={() => {handleChange(value, type.field_name);}}
                              checked={value.active}>
                              {value.name}
                            </Checkbox>
                            )
                          })
                        }
                        </Panel>
                    </Collapse>
              </React.Fragment>
                  
                    )
            })
        }
       

          <div >
            {Products.length == 0  && <div>No products to show</div>}
            {
            Products.map(
                (p,i) => { return (
                  
                    <div className="tiles-item" key={i}>
                        <div className="tiles-item-inner center-content">
                        <img 
                            src={p.image} style={{width: "300px", height:'300px'}}
                            />
                        <div className="products-item-content">
                        {p.name} <br/>
                        { p.fragrance ? <p className="text-xxs mt-16">
                        Smells Like: {p.fragrance}</p> : ''}
                        <p className="text-xs mt-4">{p.description}</p>
                        </div>
                        </div>
                    </div>
                        )
                    }
                )
            }
        </div>
        { OnPageSize >= BoundData && 
          <div className="center-content mt-32"><button onClick={onLoadMore}>Load More</button></div>
          }   

</>

    )
}

export default React.memo(FilterCollection, areEqual);