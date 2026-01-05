package com.example.TaskBoard.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "audit_logs")
public class AuditLog {

    public enum ActionType {CREATE, UPDATE, DELETE, VIEW}
    public enum EntityType {PROJECT, ISSUE, USER, PROJECT_USER}

    @Id
    @Column(name = "audit_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID auditId;

    @Column(name = "entity_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private EntityType entityType;

    @Column(name = "entity_id", nullable = false)
    private String entityId;

    @Column(name = "action_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ActionType actionType;

    @Column(name = "performed_by")
    private String performedBy;

    @Column(length = 2000)
    private String details;

    @Column(name = "timestamp", nullable = false)
    private Date timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = new Date();
    }
}
