import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import GENERAL_IMAGE from '../../assets/images';
import fonts from '../../assets/fonts';

interface CustomDatePickerProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
  accentColor?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  initialDate = new Date(),
  onDateChange,
  accentColor = '#B180E0', // Purple color from the image
}) => {
  const [date, setDate] = useState<Date>(initialDate);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (initialDate) {
      setDate(initialDate);
    }
  }, [initialDate]);

  const handleConfirm = (selectedDate: Date) => {
    setOpen(false);
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View style={[styles.container, {borderColor: accentColor}]}>
      <TouchableOpacity style={styles.dateButton} onPress={() => setOpen(true)}>
        <Text style={styles.dateText}>{format(date, 'MMMM d, yyyy')}</Text>
        <View style={[styles.calendarIcon, {borderColor: accentColor}]}>
          <Image
            source={GENERAL_IMAGE.calendar_input}
            style={[styles.calendarIcon, {tintColor: '#AF69EF'}]}
          />
        </View>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={handleConfirm}
        maximumDate={new Date()}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    width: '100%',
    marginTop: 10,
    borderWidth: 1.25,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 17,
    color: '#000000',
    fontFamily: fonts.semiBold,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    resizeMode: 'contain',
  },
  calendarIconText: {
    fontSize: 16,
  },
});

export default CustomDatePicker;


