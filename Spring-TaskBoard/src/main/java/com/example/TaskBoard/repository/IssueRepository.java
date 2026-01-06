package com.example.TaskBoard.repository;

import com.example.TaskBoard.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IssueRepository extends JpaRepository<Issue, UUID> {

    List<Issue> findByProjectId(UUID projectId);

    List<Issue> findByStatus(Issue.IssueStatus status);

    List<Issue> findBySeverity(Issue.IssueSeverity severity);

    List<Issue> findByPriority(Issue.IssuePriority priority);

    List<Issue> findByProjectIdAndStatus(UUID projectId, Issue.IssueStatus status);

    @Query("SELECT i FROM Issue i WHERE LOWER(i.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(i.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Issue> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT i FROM Issue i WHERE " +
            "(:projectId IS NULL OR i.projectId = :projectId) AND " +
            "(:status IS NULL OR i.status = :status) AND " +
            "(:severity IS NULL OR i.severity = :severity) AND " +
            "(:priority IS NULL OR i.priority = :priority) AND " +
            "(:keyword IS NULL OR LOWER(i.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(i.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Issue> findByFilters(
            @Param("projectId") UUID projectId,
            @Param("status") Issue.IssueStatus status,
            @Param("severity") Issue.IssueSeverity severity,
            @Param("priority") Issue.IssuePriority priority,
            @Param("keyword") String keyword
    );
}
