import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const [userReports] = useState([
    {
      id: 1,
      location: 'Main Street, Downtown',
      date: '2025-11-01',
      severity: 'High',
      status: 'Pending',
    },
    {
      id: 2,
      location: 'Park Avenue, Sector 12',
      date: '2025-10-28',
      severity: 'Medium',
      status: 'Reviewed',
    },
    {
      id: 3,
      location: 'Highway 45, Exit 7',
      date: '2025-10-25',
      severity: 'Low',
      status: 'Resolved',
    },
    {
      id: 4,
      location: 'Lake Road, North End',
      date: '2025-10-20',
      severity: 'High',
      status: 'Pending',
    },
    {
      id: 5,
      location: 'Bridge Street, East Side',
      date: '2025-10-15',
      severity: 'Medium',
      status: 'Reviewed',
    },
  ]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return '#ff4444';
      case 'Medium':
        return '#ffaa00';
      case 'Low':
        return '#00cc00';
      default:
        return '#666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return '#00cc00';
      case 'Reviewed':
        return '#ffaa00';
      case 'Pending':
        return '#ff4444';
      default:
        return '#666';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={100} color="#000" />
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>johndoe@example.com</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userReports.length}</Text>
              <Text style={styles.statLabel}>Reports Made</Text>
            </View>
          </View>
        </View>

        <View style={styles.reportsSection}>
          <Text style={styles.sectionTitle}>Your Reports</Text>

          {userReports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View style={styles.reportIdContainer}>
                  <Text style={styles.reportId}>Report #{report.id}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(report.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{report.status}</Text>
                </View>
              </View>

              <View style={styles.reportBody}>
                <View style={styles.reportRow}>
                  <Ionicons name="location-outline" size={18} color="#666" />
                  <Text style={styles.reportLocation}>{report.location}</Text>
                </View>

                <View style={styles.reportRow}>
                  <Ionicons name="calendar-outline" size={18} color="#666" />
                  <Text style={styles.reportDate}>{report.date}</Text>
                </View>

                <View style={styles.reportRow}>
                  <Ionicons name="alert-circle-outline" size={18} color="#666" />
                  <Text style={styles.reportLabel}>Severity: </Text>
                  <Text
                    style={[
                      styles.reportSeverity,
                      { color: getSeverityColor(report.severity) },
                    ]}
                  >
                    {report.severity}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View Details</Text>
                <Ionicons name="chevron-forward" size={18} color="#000" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#000',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 60,
    padding: 5,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  statBox: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  reportsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    padding: 16,
    marginBottom: 16,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportIdContainer: {
    flex: 1,
  },
  reportId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  reportBody: {
    marginBottom: 12,
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportLocation: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  reportDate: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  reportLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  reportSeverity: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 5,
  },
  bottomPadding: {
    height: 30,
  },
});
