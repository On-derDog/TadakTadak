package com.underdog.session.repository;

import com.underdog.session.domain.OnlineUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StatusRepository extends JpaRepository<OnlineUser,Long> {
    Optional<OnlineUser> findOnlineUserByUsername(@Param("username") String username);
}
