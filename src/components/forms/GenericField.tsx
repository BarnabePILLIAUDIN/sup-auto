import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input, type InputProps } from "@/components/ui/Input"

type Props = { name: string; label: string; description?: string } & InputProps

const GenericField = ({ name, label, description, ...props }: Props) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...field} {...props} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export default GenericField
