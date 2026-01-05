package com.example.TaskBoard.service;

import com.example.TaskBoard.entity.AuditLog;
import com.example.TaskBoard.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public void log(AuditLog.EntityType entityType, String entityId, AuditLog.ActionType actionType, String performedBy, String details) {
        AuditLog auditLog = new AuditLog();
        auditLog.setEntityType(entityType);
        auditLog.setEntityId(entityId);
        auditLog.setActionType(actionType);
        auditLog.setPerformedBy(performedBy);
        auditLog.setDetails(details);
        auditLogRepository.save(auditLog);
    }

    public void logProjectAction(String projectId, AuditLog.ActionType actionType, String performedBy, String details) {
        log(AuditLog.EntityType.PROJECT, projectId, actionType, performedBy, details);
    }

    public void logIssueAction(String issueId, AuditLog.ActionType actionType, String performedBy, String details) {
        log(AuditLog.EntityType.ISSUE, issueId, actionType, performedBy, details);
    }

    public List<AuditLog> getAuditLogsForEntity(AuditLog.EntityType entityType, String entityId) {
        return auditLogRepository.findByEntityTypeAndEntityId(entityType, entityId);
    }

    public List<AuditLog> getAuditLogsByEntityType(AuditLog.EntityType entityType) {
        return auditLogRepository.findByEntityType(entityType);
    }

    public List<AuditLog> getAuditLogsByUser(String userEmail) {
        return auditLogRepository.findByPerformedBy(userEmail);
    }

    public List<AuditLog> getAllAuditLogs() {
        return auditLogRepository.findAll();
    }
}
