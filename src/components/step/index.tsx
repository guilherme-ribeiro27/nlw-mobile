import { Text, View } from "react-native";
import { s } from "./style";
import { IconProps } from "@tabler/icons-react-native"
type Props = {
  title: string
  description: string
  icon: React.ComponentType<IconProps>
}
export function Step({title, description, icon: Icon}:Props){
  return (
    <View style={s.container}>
      <Icon size={32} color='#FF6B6B'/>
      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  )
}