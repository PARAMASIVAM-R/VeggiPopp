import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomDatePicker from '../input/dateTimeDayInput/CustomDatePicker';
import DatePickerComp from '../input/dateTimeDayInput/DatePickerComp';
import DatePickerInput from '../input/dateTimeDayInput/DatePickerInput';
import AppDatePicker from '../input/dateTimeDayInput/AppDatePicker';
import GENERAL_IMAGE from '../assets/images';
import DateTimeCard from '../input/dateTimeDayInput/DateTimeCard';
import TimePicker from '../input/dateTimeDayInput/TimePicker';
import TimePickerComp from '../input/dateTimeDayInput/TimePickerComp';
import WeekdaySelector from '../input/dateTimeDayInput/WeekdaySelector';
import YesNoRadio from '../input/radioInput/YesNoRadio';
import RadioSelection from '../input/radioInput/RadioSelection';

const componentTest = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [snoozeTime, setSnoozeTime] = useState<Date>(new Date());
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const [selected, setSelected] = useState<'yes' | 'no' | ''>(''); // default = none
  const [selectedGender, setSelectedGender] = useState<string>(''); // default no selection

  const genderOptions = [
    {value: 'male', label: 'Male'},
    {value: 'female', label: 'Female'},
    {value: 'other', label: 'Other'},
  ];
  return (
    <View style={styles.container}>
      <Text>componentTest</Text>

      {/* <CustomDatePicker
        initialDate={selectedDate}
        onDateChange={date => setSelectedDate(date)}
        accentColor="#ff7950ff"
      /> */}
     
      {/* <DatePickerComp
        label="Start Date"
        value={selectedDate}
        onChange={date => setSelectedDate(date)}
        placeholder="Select date"
      /> */}

      {/* <DatePickerInput
        title="Birth Date"
        value={selectedDate}
        onChange={date => setSelectedDate(date)}
        placeholder="DD-MM-YYYY"
      /> */}


       {/* Full Width Example */}
      {/* <AppDatePicker
        title="Start Date"
        value={startDate}
        onChange={setStartDate}
        minDate={new Date(2020, 0, 1)}
        maxDate={new Date()}
        emptyIcon={GENERAL_IMAGE.calendar_input}
        filledIcon={GENERAL_IMAGE.calendar_filled}
        width="full"
      /> */}

       {/* <DateTimeCard
        initialDate={selectedDate}
        initialTime={selectedTime}
        onDateChange={date => {
          console.log('Selected Date:', date);
          setSelectedDate(date);
        }}
        onTimeChange={time => {
          console.log('Selected Time:', time);
          setSelectedTime(time);
        }}
      /> */}

       {/* <TimePicker
        value={selectedTime || new Date()} // pass a Date object
        onChange={(date) => setSelectedTime(date)} // update state
        label="Feeding Time"
        placeholder="Pick a time"
      /> */}

      <TimePickerComp
        label="Snooze Duration"
        value={snoozeTime}
        onChange={setSnoozeTime}
        placeholder="Select Snooze Time"
      />

      <WeekdaySelector
        value={selectedDays}
        onChange={setSelectedDays}
      />

      <YesNoRadio
        value={selected}
        onValueChange={setSelected} // this will update state
        yesLabel="Yes, enable"
        noLabel="No, disable"
        color="#8A3E94"
        disabled={false}
      />

        <RadioSelection
        options={genderOptions}
        selectedValue={selectedGender}
        onValueChange={setSelectedGender}
        label="Gender"
      />

    </View>
  );
};

export default componentTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
});
