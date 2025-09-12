import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import GENERAL_IMAGE from '../../assets/images';
import fonts from '../../assets/fonts';

interface DateTimeCardProps {
  onDateChange?: (date: Date) => void;
  onTimeChange?: (date: Date) => void;
  initialDate?: Date;
  initialTime?: Date;
}

const DateTimeCard: React.FC<DateTimeCardProps> = ({
  onDateChange,
  onTimeChange,
  initialDate = new Date(),
  initialTime = new Date(),
}) => {
  const [date, setDate] = useState<Date>(initialDate);
  const [time, setTime] = useState<Date>(initialTime);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  useEffect(() => {
    setDate(initialDate ? new Date(initialDate) : new Date());
    setTime(initialTime ? new Date(initialTime) : new Date());
  }, [initialDate, initialTime]);

  const handleDateConfirm = (selectedDate: Date) => {
    setShowDatePicker(false);
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  const handleTimeConfirm = (selectedTime: Date) => {
    setShowTimePicker(false);
    setTime(selectedTime);
    if (onTimeChange) {
      onTimeChange(selectedTime);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: Date): string => {
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Date & Time</Text>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.inputText}>{formatDate(date)}</Text>
        <Image source={GENERAL_IMAGE.calendar_input} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowTimePicker(true)}>
        <Text style={styles.inputText}>{formatTime(time)}</Text>
        <Image source={GENERAL_IMAGE.clock_input} style={styles.icon} />
      </TouchableOpacity>

      <DatePicker
        modal
        open={showDatePicker}
        date={date}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDatePicker(false)}
      />

      <DatePicker
        modal
        open={showTimePicker}
        date={time}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setShowTimePicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 15,
    fontFamily: fonts.semiBold,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#00000040',
  },
  inputText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000000',
    fontFamily: fonts.medium,
  },
  icon: {
    height: 27,
    width: 27,
    resizeMode: 'contain',
  },
});

export default DateTimeCard;
