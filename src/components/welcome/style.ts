import { StyleSheet } from "react-native";
import {colors, fontFamily} from "@/styles/theme"

export const s = StyleSheet.create({
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.gray[600],
  },
  logo:{
    width: 48,
    height: 48,
    marginTop:24,
    marginBottom: 48
  },
  subtitle:{
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.gray[500],
    marginTop: 12
  }
})