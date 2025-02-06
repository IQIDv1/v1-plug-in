import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SettingsScreen() {
  return (
    <div className="w-full p-4 space-y-6">
      <h3 className="text-lg font-semibold text-purple-800">Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="text-sm font-medium text-gray-700">
            Enable Notifications
          </Label>
          <Switch id="notifications" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode" className="text-sm font-medium text-gray-700">
            Dark Mode
          </Label>
          <Switch id="darkMode" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language" className="text-sm font-medium text-gray-700">
            Language
          </Label>
          <select id="language" className="w-full p-2 border border-gray-300 rounded-md">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Settings</Button>
    </div>
  )
}

