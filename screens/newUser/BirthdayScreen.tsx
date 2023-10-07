import { Button, SafeAreaView, Text } from "react-native";
import shared from "../../styles/shared.styles";
import ContinueButton from "../components/ContinueButton";
import GoBackButton from "../components/GoBackButton";
import { SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-native-date-picker";

const BirthdayScreen = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <SafeAreaView style={shared.screen}>
      <Text style={shared.text}>
        To be able to find out who you click with:
      </Text>
      <Text style={shared.text}> Input your birthday date!</Text>
      <Button title="Open" onPress={() => setOpen(true)} />

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date: SetStateAction<Date>) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <ContinueButton navigateTo={"BigThree"} updateBody={null} />
      <GoBackButton goBackTo={"AboutYou"} />
    </SafeAreaView>
  );
};

export default BirthdayScreen;
