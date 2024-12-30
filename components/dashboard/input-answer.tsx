import { MoreVertical, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroupItem } from "../ui/radio-group";

interface InputAnswerProps {
	index: number;
	option: string;
  onChange: (index: number, value: string) => void;
}

const InputAnswer = ({ index, option, onChange }: InputAnswerProps) => {
	return (
		<div className='flex items-center justify-between p-2 rounded gap-2'>
			<div className='flex items-center space-x-2 w-full gap-3'>
				<RadioGroupItem value={option} id="r1" />
				<Input className='w-full' value={option} onChange={(e) => onChange(index, e.target.value)} />
			</div>
			<div className='flex items-center space-x-2'>
				<Button variant='outline' size='icon'>
					<Trash2 className='h-4 w-4' />
				</Button>
			</div>
		</div>
	);
};

export default InputAnswer;
