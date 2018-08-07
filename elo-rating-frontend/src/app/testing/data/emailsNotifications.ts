import {EmailsNotifications} from 'app/users/shared/emailsNotifications.model';

export const EMAILS_NOTIFICATIONS: EmailsNotifications[] = [
    {
      scheduledMatchNotification: false,
      editedMatchNotification: false,
      cancelledMatchNotification: false
    },
    {
      scheduledMatchNotification: true,
      editedMatchNotification: true,
      cancelledMatchNotification: true
    },
]
