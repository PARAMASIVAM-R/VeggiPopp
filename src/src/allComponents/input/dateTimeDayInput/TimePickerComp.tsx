import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import fonts from '../../assets/fonts';
import GENERAL_IMAGE from '../../assets/images';

interface TimePickerCompProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
}

const TimePickerComp: React.FC<TimePickerCompProps> = ({
  label = 'Snooze Duration',
  value,
  onChange,
  placeholder = 'Select time',
}) => {
  const [open, setOpen] = useState(false);

  // Format time as "X Minutes" or "X Hours Y Minutes"
  const formatDuration = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours === 0) {
      return `${minutes} Minute${minutes !== 1 ? 's' : ''}`;
    } else if (minutes === 0) {
      return `${hours} Hour${hours !== 1 ? 's' : ''}`;
    } else {
      return `${hours} Hour${hours !== 1 ? 's' : ''} ${minutes} Minute${
        minutes !== 1 ? 's' : ''
      }`;
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}>
        <Text style={styles.inputText}>
          {value ? formatDuration(value) : placeholder}
        </Text>
        <View style={styles.iconContainer}>
          <Image source={GENERAL_IMAGE.clock_input} style={styles.clockIcon} />
        </View>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={value}
        mode="time"
        locale="en"
        minuteInterval={5}
        is24hourSource="locale"
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
    marginVertical: 8,
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
  clockIcon: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
  },
});

export default TimePickerComp;
