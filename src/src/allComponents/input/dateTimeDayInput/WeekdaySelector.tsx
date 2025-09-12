import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import fonts from '../../assets/fonts';

type Props = {
  value: number[]; // indexes of selected days (0 to 6)
  onChange: (updated: number[]) => void;
};

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const WeekdaySelector: React.FC<Props> = ({value, onChange}) => {
  const toggleDay = (index: number) => {
    if (value.includes(index)) {
      onChange(value.filter(i => i !== index));
    } else {
      onChange([...value, index]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Specific Days</Text>
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          const isSelected = value.includes(index);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => toggleDay(index)}
              style={[
                styles.dayCircle,
                isSelected ? styles.selected : styles.unselected,
              ]}>
              <Text style={[styles.dayText, isSelected && styles.selectedText]}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default WeekdaySelector;

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
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  selected: {
    backgroundColor: '#8A3E94',
    borderColor: '#8A3E94',
  },
  unselected: {
    borderColor: '#00000026',
    backgroundColor: '#FFF',
  },
  dayText: {
    fontWeight: '700',
    color: '#808080',
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  selectedText: {
    color: '#FFF',
  },
});
