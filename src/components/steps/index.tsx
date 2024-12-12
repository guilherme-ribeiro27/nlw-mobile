import { Text, View } from 'react-native'
import {s} from './styles'
import { Step } from '../step'
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'
export function Steps(){
  return(
    <View style={s.container}>
      <Text style={s.title}>Veja como funciona:</Text>

      <Step 
        title='Encontre estabelecimentos' 
        description='Veja locais perto de você'
        icon={IconMapPin}
      />
      <Step 
        title='Ative seu cupom com QR Code' 
        description='Escaneie o código no estabelecimento para usar o benefício'
        icon={IconQrcode}
      />
      <Step 
        title='Garanta as vatangens perto de você' 
        description='Ative os cupons onde estiver'
        icon={IconTicket}
      />
    </View>
  )
}