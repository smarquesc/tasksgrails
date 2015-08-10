dataSource {
    pooled = true
    jmxExport = true
    driverClassName = "org.h2.Driver"
    username = "sa"
    password = ""
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
//    cache.region.factory_class = 'org.hibernate.cache.SingletonEhCacheRegionFactory' // Hibernate 3
    cache.region.factory_class = 'org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory' // Hibernate 4
    singleSession = true // configure OSIV singleSession mode
    flush.mode = 'manual' // OSIV session flush mode outside of transactional context
}

// environment specific settings
environments {
    development {
        dataSource {
            dbCreate = "create-drop" // one of 'create', 'create-drop', 'update', 'validate', ''
            url = "jdbc:h2:mem:devDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE"
        }
    }
    test {
        dataSource {
            dbCreate = "update"
            url = "jdbc:h2:mem:testDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE"
        }
    }
    production {
        dataSource {
        dbCreate = "update"
        driverClassName = "org.postgresql.Driver"
        dialect = org.hibernate.dialect.PostgreSQLDialect

        uri = new URI(System.env.DATABASE_URL?:"postgres://bcwdynqwmefvyt:4epD-IFG-Y0eBn6TzZJg9xn8RN@ec2-54-204-3-200.compute-1.amazonaws.com:5432/d9ah1nu83uc8l3")

        url = "jdbc:postgresql://" + uri.host + ":" + uri.port + uri.path
        username = uri.userInfo.split(":")[0]
        password = uri.userInfo.split(":")[1]
        }
    }
}
