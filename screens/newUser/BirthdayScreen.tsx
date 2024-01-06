import {
  Button,
  ImageBackground,
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
import { calculateAge } from "../../lib/calculateAge";

const BirthdayScreen = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [dateString, setDateString] = useState<string>("");
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [sign, setSign] = useState<string>("");
  const [age, setAge] = useState<number>(null);

  return (
    <SafeAreaView style={shared.screen}>
      <ImageBackground
        source={require("../../assets/background-3.png")}
        resizeMethod="auto"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Text style={[shared.text, { marginTop: 100 }]}>
          {" "}
          Input your birthday date
        </Text>
        <TouchableOpacity
          style={[shared.button, { width: "30%" }]}
          onPress={() => setOpenDate(true)}
        >
          <Text style={shared.buttonText}>Set Date</Text>
        </TouchableOpacity>

        {dateString && (
          <Text style={{ color: "white", fontSize: 30, margin: 20 }}>
            {dateString}
          </Text>
        )}

        <DatePicker
          modal
          mode="date"
          open={openDate}
          date={date}
          onConfirm={(selectedDate: Date) => {
            const formattedDate = selectedDate.toISOString().split("T")[0];
            setAge(calculateAge(selectedDate));
            setOpenDate(false);
            setDate(selectedDate);
            setDateString(formattedDate);
            setSign(
              getZodiacSign(selectedDate.getMonth() + 1, selectedDate.getDate())
            );
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
            age: age,
          }}
          isDisabled={!dateString}
        />
        <GoBackButton goBackTo={"AboutYou"} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default BirthdayScreen;
