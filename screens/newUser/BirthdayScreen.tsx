import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import shared from "../../styles/shared.styles";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";
import { SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-native-date-picker";
import { getZodiacSign } from "../../lib/getZodiacSign";

const BirthdayScreen = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [dateString, setDateString] = useState<string>("");
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [sign, setSign] = useState<string>("");

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}> Input your birthday date</Text>
      <TouchableOpacity
        style={[shared.button, { width: "30%" }]}
        onPress={() => setOpenDate(true)}
      >
        <Text style={shared.buttonText}>Set Date</Text>
      </TouchableOpacity>

      {dateString && (
        <Text style={{ color: "white" }}>{dateString.toString()}</Text>
      )}

      <DatePicker
        modal
        mode="date"
        open={openDate}
        date={date}
        onConfirm={(date: SetStateAction<Date>) => {
          setOpenDate(false);
          setDate(date);
          if ("toLocaleDateString" in date) {
            setDateString(date.toLocaleDateString() as string);
            setSign(getZodiacSign(date.getMonth() + 1, date.getDate()));
          }
        }}
        onCancel={() => {
          setOpenDate(false);
        }}
      />

      <ContinueButton
        navigateTo={"ZodiacInfo"}
        updateBody={{
          birthdayDate: dateString,
          zodiacSign: sign,
        }}
      />
      <GoBackButton goBackTo={"AboutYou"} />
    </SafeAreaView>
  );
};

export default BirthdayScreen;
