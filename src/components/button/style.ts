import { StyleSheet } from "react-native";
import {colors, fontFamily} from "@/styles/theme"

export const s = StyleSheet.create({
  container:{
    height: 56,
    maxHeight: 56,
    borderRadius: 10,
    backgroundColor: colors.green.base,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 14
  },
  title:{
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.gray[100]
  }
})