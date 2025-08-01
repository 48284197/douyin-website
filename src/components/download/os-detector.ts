export type OSType = 'windows' | 'mac-intel' | 'mac-m1' | 'linux' | 'unknown';

export interface OSInfo {
  type: OSType;
  name: string;
  icon: string;
}

/**
 * 检测用户的操作系统和芯片类型
 */
export function detectOS(): OSInfo {
  if (typeof window === 'undefined') {
    return { type: 'unknown', name: '未知系统', icon: '💻' };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform.toLowerCase();

  // 检测 Windows
  if (userAgent.includes('win') || platform.includes('win')) {
    return { type: 'windows', name: 'Windows', icon: '🪟' };
  }

  // 检测 macOS
  if (userAgent.includes('mac') || platform.includes('mac')) {
    // 检测 M1/M2 芯片 (Apple Silicon)
    // 注意：这个检测方法可能不是100%准确，因为浏览器可能不会暴露芯片信息
    // 更准确的方法是让用户手动选择
    const isAppleSilicon = userAgent.includes('arm') || 
                          userAgent.includes('aarch64') ||
                          // 一些启发式检测
                          (userAgent.includes('safari') && !userAgent.includes('chrome') && 
                           new Date().getFullYear() >= 2020);
    
    if (isAppleSilicon) {
      return { type: 'mac-m1', name: 'Mac (Apple Silicon)', icon: '🍎' };
    } else {
      return { type: 'mac-intel', name: 'Mac (Intel)', icon: '🍎' };
    }
  }

  // 检测 Linux
  if (userAgent.includes('linux') || platform.includes('linux')) {
    return { type: 'linux', name: 'Linux', icon: '🐧' };
  }

  return { type: 'unknown', name: '未知系统', icon: '💻' };
}

/**
 * 获取所有支持的平台信息
 */
export function getAllPlatforms(): OSInfo[] {
  return [
    { type: 'windows', name: 'Windows', icon: '🪟' },
    { type: 'mac-intel', name: 'Mac (Intel)', icon: '🍎' },
    { type: 'mac-m1', name: 'Mac (Apple Silicon)', icon: '🍎' },
  ];
}

/**
 * 根据平台类型获取平台信息
 */
export function getPlatformInfo(type: OSType): OSInfo {
  const platforms = getAllPlatforms();
  return platforms.find(p => p.type === type) || 
         { type: 'unknown', name: '未知系统', icon: '💻' };
}