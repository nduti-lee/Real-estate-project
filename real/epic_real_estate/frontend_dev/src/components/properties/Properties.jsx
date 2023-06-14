import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import { arrPriceRanges } from '../../util/idxToPriceRange'
import classes from './properties.module.css'
import { useEffect } from 'react'
import { continentToIdx } from '../../util/idxToContinent'
import { request } from '../../util/fetchAPI'
// import PropertyCard from '../propertyCard/PropertyCard'
import { FaBed } from 'react-icons/fa'
import { FaSquareFull } from 'react-icons/fa'
import person from '../../assets/IMG-20220421-WA0008.jpg'

//set properties
const Properties = () => {
  const [allProperties, setAllProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [state, setState] = useState(null)
  const query = (useLocation().search).slice(1) // slice(1) to remove "?"
  const arrQuery = query.split("&")
  const navigate = useNavigate()

  // fetch all properties
  useEffect(() => {
    const fetchAllProperties = async() => {
      const data = await request(`/property/getAll`, 'GET')
      setAllProperties(data)
    }
    fetchAllProperties()
  }, [])

  // parsing query params
  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {}
      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0]
        const value = option.split("=")[1]

        formattedQuery = { ...formattedQuery, [key]: value }

        // if we are on the last index, assign the formattedQuery obj to state
        if (idx === arrQuery.length - 1) {
          setState(prev => formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allProperties, arrQuery])


  const handleState = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }


  const handleSearch = (param = state) => {
    let options
    // we either pass the formattedObj or event, that's why we do the IF/ELSE
    if (param?.nativeEvent) {
      options = state
    } else {
      options = param
    }
    const filteredProperties = allProperties.filter((property) => {

      const priceRange = arrPriceRanges[options.priceRange]
      const minPrice = Number(priceRange.split('-')[0])
      const maxPrice = Number(priceRange.split('-')[1])
      const continent = continentToIdx(property.continent)

      if (
        property.type === options.type
        && continent === Number(options.continent)
        && property.price >= minPrice && property.price <= maxPrice
      ) {
        return property
      }
    })

    const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRange}`

    navigate(`/properties?${queryStr}`, { replace: true })
    setFilteredProperties(prev => filteredProperties)
  }



  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>

          <select value={state?.type} name="type" onChange={handleState}>
            <option disabled>Select type</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="village">Village</option>
          </select>
          <select value={state?.priceRange} name="priceRange" onChange={handleState}>
            <option disabled>Select Price Range</option>
            <option value="0">50,000 -100,000 </option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000-500,000</option>
          </select>
          <select value={state?.continent} name="location" onChange={handleState}>
            <option disabled>Select Location</option>
            <option value="0">Mombasa</option>
            <option value="1">Nairobi</option>
            <option value="2">Kajiado</option>
            <option value="3">Nakuru</option>
            <option value="4">Kakamega</option>
            <option value="5">Kisumu</option>
          </select>
          <button className={classes.searchBtn}>
            <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon} />
          </button>
        </div>
        {filteredProperties?.length > 0 ?
          <>
            <div className={classes.titles}>
              <h5>Selected properties</h5>
              <h2>Property you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((property) => (
                <div key={property._id} className={classes.property}>
                  <Link className={classes.imgContainer} to={`/propertyDetail/ ${property._id}`}>
                    <img src={`http://localhost:5000/images/${property?.img}`} alt=''/>
                  </Link>

                  <div className={classes.details}>
                    <div className={classes.priceAndOwner}>
                      <span className={classes.price}>$ {property.price}</span>
                      <img src={person} className={classes.owner}/>
                    </div>
                    <div className={classes.moreDetails}>
                      <span>{property.beds} <FaBed className={classes.icon}/></span>
                      <span>{property.sqmeters} sq. meters <FaSquareFull className={classes.icon}/></span>
                    </div>
                    <div className={classes.desc}>
                      {property.desc}
                    </div>
                    </div>
            </div>
              ))}
              </div>
            </>
             : <h2 className={classes.noProperty}>We have no properties with the specified options.</h2>}
      </div>
    </div>
  )
}

export default Properties