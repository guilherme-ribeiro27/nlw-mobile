import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { api } from "@/services/api";
import { Categories, type CategoriesProps } from "@/components/categories";
import type { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import MapView, { Callout, Marker} from "react-native-maps";
import * as Location from 'expo-location'
import { fontFamily, colors } from "@/styles/theme";
import { router } from "expo-router";

type MarketProps = PlaceProps & {
  latitude: number;
  longitude: number;
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494
}

export default function Home(){
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState<string>("")
  const [markets, setMarkets] = useState<MarketProps[]>([])

  async function fetchCategories(){
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
      setCategory(data[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert("Categorias", 'Erro ao buscar categorias')
    }
  }

  async function fetchMarkets(){
    try {
      if(!category) return
      const { data } = await api.get('/markets/category/' + `${category}`)
      setMarkets(data)
    } catch (error) {
       Alert.alert("Locais", 'Erro ao buscar locais.')
    }
  }

  async function getCurrentLocation(){
    try {
      let { granted } = await Location.requestForegroundPermissionsAsync()

      if(granted){
        let location = await Location.getCurrentPositionAsync({})
        console.log(location)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    // getCurrentLocation()
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [category])

  return (
    <View style={{flex:1}}>
      <Categories data={categories} selected={category} onSelect={setCategory}/>
      <MapView style={{flex: 1}} 
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Marker identifier="current" coordinate={currentLocation} title="Você está aqui" image={require("@/assets/location.png")}/>
        {
          markets.map((market, index) => (
            <Marker key={index} coordinate={{latitude: market.latitude, longitude: market.longitude}} image={require("@/assets/pin.png")}>
              <Callout onPress={()=> router.navigate(`/market/${market.id}`)}>
                <Text style={{
                  fontSize: 14,
                  color: colors.gray[600],
                  fontFamily: fontFamily.medium
                }}>{market.name}</Text>
                <Text style={{
                  fontSize: 12,
                  color: colors.gray[600],
                  fontFamily: fontFamily.regular
                }}>{market.address}</Text>
              </Callout>
            </Marker>
          ))
        }
      </MapView>
      <Places data={markets}/>
    </View>
  )
}