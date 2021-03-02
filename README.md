# kaholo-plugin-lacework
Kaholo Plugin for Lacework

### Settings:
1) Secret(required) - Lacework secret access key. Can only be created by administrator using the Lacework console.
2) URL(required) - The base URL to your Lacework environment.
3) Key Id(required) - Lacework access Key ID. Can only be created by administrator using the Lacework console.

## Method: Get event details
This method returns all the data about the lacework event specified.

### Parameters:
1) Event ID(required) - The event ID of the requested event. If using the lacework webhook, you can get it from the event_id field.
