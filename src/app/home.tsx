import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { api } from "@/services/api";

export default function Home(){
  const [categories, setCategories] = useState([])

  async function fetchCategories(){
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Categorias", 'Erro ao buscar categorias')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <View style={{flex:1, padding:40, gap:40}}>
      <Text>Home</Text>
      <Text>Categorias</Text>
      {
        categories.map((category: any) => (
          <Text key={category.id}>{category.name}</Text>
        ))
      }
    </View>
  )
}