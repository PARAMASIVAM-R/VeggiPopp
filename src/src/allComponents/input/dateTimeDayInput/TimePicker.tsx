import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import GENERAL_IMAGE from '../../assets/images';
import fonts from '../../assets/fonts';

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select time',
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const formattedTime = value ? format(value, 'hh:mm a') : placeholder;

  const handleConfirm = (date: Date) => {
    setOpen(false);
    onChange(date);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.pickerButton, disabled && styles.disabledButton]}
        onPress={() => !disabled && setOpen(true)}
        activeOpacity={disabled ? 1 : 0.7}>
        <Text style={[styles.pickerText, !value && styles.placeholder]}>
          {formattedTime}
        </Text>
        <View style={styles.iconContainer}>
          <Image source={GENERAL_IMAGE.clock_input} style={styles.calendarIcon} />
        </View>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={value || new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        mode="time"
        title="Select Time"
        confirmText="Confirm"
        cancelText="Cancel"
        is24hourSource="locale"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: '100%',
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
    fontWeight: '500',
  },
  pickerButton: {
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
  disabledButton: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  pickerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: fonts.medium,
    flex: 1,
  },
  placeholder: {
    color: '#888',
  },
  iconContainer: {
    marginLeft: 8,
  },
  icon: {
    fontSize: 18,
  },
  calendarIcon: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
  },
});

export default TimePicker;
