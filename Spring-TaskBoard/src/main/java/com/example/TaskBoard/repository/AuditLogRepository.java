package com.example.TaskBoard.repository;

import com.example.TaskBoard.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {
    
    List<AuditLog> findByEntityTypeAndEntityId(AuditLog.EntityType entityType, String entityId);
    
    List<AuditLog> findByEntityType(AuditLog.EntityType entityType);
    
    List<AuditLog> findByPerformedBy(String performedBy);
}
