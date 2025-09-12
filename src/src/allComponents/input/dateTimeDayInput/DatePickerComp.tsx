import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import fonts from '../../assets/fonts';
import GENERAL_IMAGE from '../../assets/images';

interface DatePickerCompProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
}

const DatePickerComp: React.FC<DatePickerCompProps> = ({
  label = 'Start Date',
  value,
  onChange,
  placeholder = 'Select date',
}) => {
  const [open, setOpen] = useState(false);

  // Format date as DD-MM-YYYY
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}>
        <Text style={styles.inputText}>
          {value ? formatDate(value) : placeholder}
        </Text>
        <View style={styles.iconContainer}>
          <Image
            source={GENERAL_IMAGE.calendar_input}
            style={styles.calendarIcon}
          />
        </View>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={value}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#00000026',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFF',
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: fonts.medium,
    flex: 1,
  },
  iconContainer: {
    marginLeft: 8,
  },
  calendarIcon: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
  },
});

export default DatePickerComp;
