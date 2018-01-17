package com.elorating.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EmailsNotifications {

    @JsonProperty (defaultValue = "false")
    private boolean scheduledMatchNotification;
    @JsonProperty (defaultValue = "false")
    private boolean editedMatchNotification;
    @JsonProperty (defaultValue = "false")
    private boolean cancelledMatchNotification;

    public EmailsNotifications() {
    }

    public EmailsNotifications(boolean scheduledMatchNotification, boolean editedMatchNotification, boolean cancelledMatchNotification) {
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
