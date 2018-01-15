package com.elorating.model;

public class UserSettings {

    private boolean scheduledMatchNotification;
    private boolean editedMatchNotification;
    private boolean cancelledMatchNotification;

    public UserSettings() {
        this.scheduledMatchNotification = true;
        this.editedMatchNotification = true;
        this.cancelledMatchNotification = true;
    }

    public UserSettings(boolean scheduledMatchNotification, boolean editedMatchNotification, boolean cancelledMatchNotification) {
        this.scheduledMatchNotification = scheduledMatchNotification;
        this.editedMatchNotification = editedMatchNotification;
        this.cancelledMatchNotification = cancelledMatchNotification;
    }

    public boolean isScheduledMatchNotification() {
        return scheduledMatchNotification;
    }

    public void setScheduledMatchNotification(boolean scheduledMatchNotification) {
        this.scheduledMatchNotification = scheduledMatchNotification;
    }

    public boolean isEditedMatchNotification() {
        return editedMatchNotification;
    }

    public void setEditedMatchNotification(boolean editedMatchNotification) {
        this.editedMatchNotification = editedMatchNotification;
    }

    public boolean isCancelledMatchNotification() {
        return cancelledMatchNotification;
    }

    public void setCancelledMatchNotification(boolean cancelledMatchNotification) {
        this.cancelledMatchNotification = cancelledMatchNotification;
    }
}
