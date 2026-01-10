import NewService from '@/components/profile/new-service';
import Service from '@/components/profile/service';
import { useAuthStore } from '@/lib/stores/auth-store';
import { View } from 'react-native';

const Services = () => {
  const { userProfile } = useAuthStore();
  const { services } = userProfile!;

  const disabledRemoval = userProfile?.services.length! === 1;

  return (
    <View className="mt-2 gap-2">
      {services.map((service) => (
        <Service key={service.name} service={service} disabledRemoval={disabledRemoval} />
      ))}
      <NewService services={services} />
    </View>
  );
};

export default Services;
