import { Text, TouchableOpacity } from "react-native";
import { FC } from "react";

interface ButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ title, onPress, className }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-blue-600 p-4 rounded-lg ${className}`}
    >
      <Text className="text-white text-center text-lg font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
