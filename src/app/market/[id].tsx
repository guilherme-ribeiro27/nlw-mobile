import { api } from "@/services/api";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Text, View, Modal, StatusBar, ScrollView } from "react-native";
import {Loading} from '@/components/loading'
import { Cover } from "@/components/market/cover";
import { Details, type PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";
import { useCameraPermissions, CameraView } from "expo-camera";

type DataProps = PropsDetails & {
  cover: string;
}

export default function Market() {
  const [market, setMarket] = useState<DataProps>();
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [cameraModal, setCameraModal] = useState(false);
  const [couponIsFetching, setCouponIsFetching] = useState(false);

  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{id :string}>();
  console.log(params.id)
  const qrLock = useRef(false);

  async function fetchMarket(){
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setMarket(data)
      setLoading(false)
    } catch (error) {
      Alert.alert('Error','Houve um erro ao buscar os dados do estabelecimento')
    }
  }

  async function handleOpenCamera(){
    try {
      const {granted} = await requestPermission()
      if(!granted) return Alert.alert('Permissão negada', 'Você precisa permitir o acesso a câmera para ler o QR Code')
      setCameraModal(true)
      qrLock.current = false;
    } catch (error) {
      Alert.alert('Error','Houve um erro ao abrir a câmera')
    }
  }


  async function getCoupon(id:string){
    try {
      setCouponIsFetching(true);

      const { data } = await api.patch(`/coupons/${id}`)
      Alert.alert('Cupom', data.coupon)

      setCoupon(data.coupon)

    } catch (error) {
      Alert.alert('Error','Houve um erro ao buscar o cupom')
    }
    finally{
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(id:string){
    setCameraModal(false)
    Alert.alert('Cupom', 'Não é possível utilizar um cupom já resgatado. Deseja realmente resgatar o cupom?',[
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Resgatar',
        onPress: () => getCoupon(id)
      }
    ])
  }
  useEffect(()=>{
    fetchMarket()
  },[params.id, coupon])

  if(loading) return <Loading/>

  if(!market) return <Redirect href="/home" />

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" hidden={cameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market.cover} />
        <Details data={market} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{padding:32}}> 
        <Button onPress={() => handleOpenCamera()}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>
      <Modal style={{flex:1}} visible={cameraModal}>

        <CameraView 
          style={{flex:1}}
          facing="back"
          onBarcodeScanned={({data})=> {
            if(data && !qrLock.current){
              qrLock.current = true;
              setTimeout(()=> handleUseCoupon(data), 500)
            }
          }}
        />

        <View style={{position: 'absolute', bottom:32, left:32, right:32}}>
          <Button onPress={() => setCameraModal(false)} isLoading={couponIsFetching}>
            <Button.Title>Fechar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}